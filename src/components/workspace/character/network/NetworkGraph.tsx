import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { TCharacter, TRelation } from "@/utils/APIs/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "@/components/Modal";
import EditRelation from "@/components/workspace/character/network/EditRelation";
import { useParams } from "next/navigation";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import {
  getCharacterList,
  getRelationList,
} from "@/utils/APIs/workspace/character";
import { CreateRelationButton } from "@/styles/workspace/Character.style";
import { EditRelationProps } from "@/components/workspace/character/network/EditRelation";
import CharacterModal from "@/components/workspace/character/CharacterModal";

export type Node = {
  id: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  name?: string;
  image?: string;
};

export type Link = {
  source: string;
  target: string;
  name?: string; // or label, or any other field name
  virtual?: boolean;
};

function findConnectedComponents(nodes: Node[], links: Link[]): Node[][] {
  const visited = new Set<string>();
  const adjList = new Map<string, string[]>();

  // 인접 리스트 생성
  for (const link of links) {
    if (!adjList.has(link.source)) {
      adjList.set(link.source, []);
    }
    adjList.get(link.source)!.push(link.target);

    if (!adjList.has(link.target)) {
      adjList.set(link.target, []);
    }
    adjList.get(link.target)!.push(link.source);
  }

  function dfs(node: string, component: Node[]): void {
    if (visited.has(node)) return;

    visited.add(node);
    component.push({ id: node });
    for (const neighbor of adjList.get(node) || []) {
      dfs(neighbor, component);
    }
  }

  const components: Node[][] = [];
  for (const node of nodes) {
    if (!visited.has(node.id)) {
      const component: Node[] = [];
      dfs(node.id, component);
      components.push(component);
    }
  }

  return components;
}

function connectDisconnectedSubgraphs(nodes: Node[], links: Link[]): Link[] {
  const components = findConnectedComponents(nodes, links);
  const newLinks: Link[] = [];

  for (let i = 1; i < components.length; i++) {
    newLinks.push({
      source: components[i - 1][0].id,
      target: components[i][0].id,
      virtual: true,
    });
  }

  return [...links, ...newLinks];
}

const transformToNodesAndLinks = (
  data: TRelation[],
  characterList: TCharacter[]
): { nodes: Node[]; links: Link[] } => {
  const nodeIdSet = new Set<string>();
  const links: Link[] = [];

  data.forEach((item) => {
    // Nodes
    nodeIdSet.add(item.start_ch);
    nodeIdSet.add(item.end_ch);

    // Links
    if (item.arrow_right) {
      links.push({
        source: item.start_ch,
        target: item.end_ch,
        name: item.arrow_text_right,
      });
    }
    if (item.arrow_left) {
      links.push({
        source: item.end_ch,
        target: item.start_ch,
        name: item.arrow_text_left,
      });
    }
  });

  // Removing duplicate nodes based on 'id' using a Set
  const nodes: Node[] = Array.from(nodeIdSet).map((id) => {
    const character = characterList.find((character) => character.id === id);
    return {
      id,
      name: character?.ch_name ?? "삭제되었거나 존재하지 않는 사용자입니다",
      image: character?.ch_image,
    };
  });

  return {
    nodes,
    links,
  };
};

const radius = 50;

const imgWidth = radius * 4; // 원의 2배 크기로 설정
const imgHeight = radius * 4; // 원의 2배 크기로 설정

const NetworkGraph = () => {
  const ref = useRef<SVGSVGElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalContent, setModalContent] = useState<
    null | EditRelationProps<true> | EditRelationProps<false>
  >(null);
  const [characterModal, setcharacterModal] = useState<null | string>(null);
  const queryClient = useQueryClient();
  const { workspace_id } = useParams<{ workspace_id: string }>();
  const {
    data: relations,
    error,
    isLoading: isLoading2,
  } = useQuery({
    queryKey: workspaceQueryKeys.characterRelation(workspace_id),
    queryFn: getRelationList(workspace_id),
  });
  const { data: characterList } = useQuery({
    queryKey: workspaceQueryKeys.characterList(workspace_id),
    queryFn: getCharacterList(workspace_id),
  });

  useEffect(() => {
    const svg = d3.select(ref.current!);

    // 너비 및 높이를 업데이트하는 함수
    const updateDimensions = () => {
      const currentWidth = parseFloat(svg.attr("width"));
      const currentHeight = parseFloat(svg.attr("height"));

      if (
        ref.current &&
        ref.current.parentElement &&
        currentWidth &&
        currentHeight
      ) {
        const boundingRect = ref.current.parentElement.getBoundingClientRect();
        const width = boundingRect.width;
        const height = boundingRect.height;
        svg.attr("width", width + 270).attr("height", height);
      }
    };

    updateDimensions();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (!relations || !characterList) return;
    const { nodes, links } = transformToNodesAndLinks(relations, characterList);

    const svg = d3.select(ref.current!);

    svg
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "#EFF1F7");

    // 너비 및 높이를 업데이트하는 함수
    const updateDimensions = () => {
      if (ref.current && ref.current.parentElement) {
        const boundingRect = ref.current.parentElement.getBoundingClientRect();
        const width = boundingRect.width;
        const height = boundingRect.height;
        svg.attr("width", width).attr("height", height);

        // 강제 시뮬레이션 업데이트
        simulation.force("center", d3.forceCenter(width / 2, height / 2));
        simulation.restart();
      }
    };

    // source와 target을 기반으로 relation을 찾는 함수
    const findRelation = (sourceId: string, targetId: string) => {
      const relation = relations!.find(
        (relation) =>
          (relation.end_ch == sourceId && relation.start_ch == targetId) ||
          (relation.end_ch == targetId && relation.start_ch == sourceId)
      )!;

      return {
        character1: characterList.find(
          (character) => character.id == relation?.start_ch
        )!,
        character2: characterList.find(
          (character) => character.id == relation?.end_ch
        )!,
        relation,
      };
    };

    // 동일한 노드 쌍을 가진 모든 링크의 텍스트를 선택하는 함수
    const selectConnectedTexts = (sourceId: string, targetId: string) => {
      return linkText.filter(
        (d: any) =>
          (d.source.id === sourceId && d.target.id === targetId) ||
          (d.source.id === targetId && d.target.id === sourceId)
      );
    };

    // 1. 긴 문자열을 줄바꿈하여 배열로 반환하는 함수
    const wrapText = (text: string, maxLength = 5) => {
      let lines = [];

      while (text.length > 0) {
        lines.push(text.substring(0, maxLength));
        text = text.substring(maxLength);
      }
      return lines;
    };

    const graphGroup = svg.append("g");

    const newLinks = connectDisconnectedSubgraphs(nodes, links);

    // Zoom functionality
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 10]) // Zoom limits
      .on("zoom", (event) => {
        const transform = event.transform;
        graphGroup.attr("transform", transform.toString());
      });

    svg.call(zoom);

    const simulation = d3
      .forceSimulation<Node>(nodes)
      .force(
        "link",
        d3.forceLink(newLinks).id((d: any) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-60000));

    const defs = svg.append("defs");
    defs
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 0) // 화살표 위치 조절
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 5)
      .attr("markerHeight", 5)
      .attr("xoverflow", "visible")
      .append("svg:path")
      .attr("d", "M 0,-5 L 10 ,0 L 0,5")
      .attr("fill", "black")
      .style("stroke", "none");

    defs
      .append("clipPath")
      .attr("id", "clip-circle")
      .append("circle")
      .attr("r", radius)
      .attr("cx", 0)
      .attr("cy", 0);

    const link = graphGroup
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "black")
      .attr("marker-end", "url(#arrowhead)")
      .attr("stroke-width", 2);

    const linkTextBackground = graphGroup
      .append("g")
      .selectAll("rect")
      .data(links)
      .enter()
      .append("g")
      .each(function (d: any) {
        // 각 링크에 대해
        const lines = wrapText(d.name); // 문자열을 줄바꿈하여 배열로 변환
        const textSelection = d3.select(this);
        lines.forEach((line, index) => {
          textSelection
            .append("rect")
            .attr("fill", "white")
            .attr("rx", 3) // 모서리 둥글게
            .attr("ry", 3);
        });
      });

    const linkText = graphGroup
      .append("g")
      .selectAll("text")
      .data(links)
      .enter()
      .append("text")
      .attr("font-size", "15px") // 폰트 사이즈
      .style("cursor", "pointer")
      .each(function (d: any) {
        // 각 링크에 대해
        const lines = wrapText(d.name); // 문자열을 줄바꿈하여 배열로 변환
        const textSelection = d3.select(this);
        lines.forEach((line, index) => {
          textSelection.append("tspan").text(line);
        });
      })
      .on("mouseenter", function (event, d: any) {
        selectConnectedTexts(d.source.id, d.target.id)
          .attr("stroke", "black")
          .attr("stroke-width", 1);
      })
      .on("mouseleave", function (event, d: any) {
        selectConnectedTexts(d.source.id, d.target.id).attr("stroke", null);
      })
      .on("click", (event, d: any) => {
        setModalContent({
          isNewMode: false,
          ...findRelation(d.source.id, d.target.id),
        });
      });

    // const node = graphGroup.append('g').selectAll('circle').data(nodes).enter().append('circle').attr('r', radius).attr('fill', '#C55858');

    const nodeGroup = graphGroup
      .append("g")
      .selectAll("g.node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("cursor", "pointer");

    nodeGroup.append("circle").attr("r", radius).attr("fill", "transparent");

    nodeGroup
      .filter((d: any) => !d.image)
      .append("circle")
      .attr("r", radius)
      .attr("fill", "#DFDFDF")
      .attr("clip-path", "url(#clip-circle)");

    nodeGroup
      .filter((d: any) => !d.image && d.name)
      .append("text")
      .attr("text-anchor", "middle") // 가운데 정렬
      .attr("dy", "0.35em") // 상하 정렬 조정 (보통 가운데 정렬에 약간의 수정이 필요합니다)
      .text((d: any) => d.name.charAt(0)) // d.text는 표시할 텍스트입니다. 필요한 데이터 속성으로 바꿔주세요.
      .style("fill", "black") // 글씨 색상
      .style("font-weight", "bold") // 글씨를 굵게
      .style("font-size", "24px"); // 글씨 크기를 24px로 설정

    nodeGroup
      .append("image")
      .filter((d: any) => d.image)
      .attr("xlink:href", (d: any) => d.image)
      .each(function (d: any) {
        const img = new Image();
        img.src = d.image;
        img.onload = () => {
          const imgRatio = img.width / img.height;
          let newWidth, newHeight, xOffset, yOffset;

          if (imgRatio < 1) {
            // 이미지가 세로로 긴 경우
            newWidth = radius * 2;
            newHeight = newWidth / imgRatio;
          } else {
            // 이미지가 가로로 긴 경우
            newHeight = radius * 2;
            newWidth = newHeight * imgRatio;
          }

          xOffset = -newWidth / 2;
          yOffset = -newHeight / 2;

          d3.select(this)
            .attr("x", xOffset)
            .attr("y", yOffset)
            .attr("width", newWidth)
            .attr("height", newHeight)
            .attr("clip-path", "url(#clip-circle)");
        };
      });

    nodeGroup
      .append("text")
      .attr("dy", radius + 25) // Adjust this to position the text below the node.
      .attr("text-anchor", "middle")
      .attr("font-size", "17px")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .text((d: any) => d.name);

    nodeGroup
      .on("mouseenter", function (event, d) {
        //테두리 추가
        nodeGroup
          .filter((n) => n.id === d.id)
          .append("circle")
          .attr("r", radius + 5)
          .attr("fill", "transparent")
          .attr("stroke", "black")
          .attr("stroke-width", 2);
      })
      .on("mouseleave", function (event, d) {
        //테두리 삭제
        const temp = nodeGroup.filter((n) => n.id === d.id).selectAll("circle");
        temp.filter((_, i) => i === temp.size() - 1).remove();
      })
      .on("click", (event, d) => {
        setcharacterModal(d.id);
      });

    const computeLinkOffset = (sourceId: string, targetId: string) => {
      const duplicates = links.filter(
        (l: any) =>
          (l.source.id === sourceId && l.target.id === targetId) ||
          (l.source.id === targetId && l.target.id === sourceId)
      );

      return duplicates.length > 1 ? 12 : 0; // 30은 오프셋 크기입니다. 필요에 따라 조정할 수 있습니다.
    };

    const computeLinkOffset2 = (sourceId: string, targetId: string) => {
      const duplicates = links.filter(
        (l: any) =>
          (l.source.id === sourceId && l.target.id === targetId) ||
          (l.source.id === targetId && l.target.id === sourceId)
      );

      if (duplicates.length > 1) {
        // Check if it's the first or second link for the given node pair
        const isSecondLink =
          duplicates[0].source === sourceId &&
          duplicates[0].target === targetId;
        return isSecondLink ? 70 : -70; // 30 is the offset size; adjust as needed.
      }
      return 0;
    };

    simulation.on("tick", () => {
      // 선 길이 결정
      link
        .attr("x1", (d: any) => {
          const deltaX = d.target.x - d.source.x;
          const deltaY = d.target.y - d.source.y;
          const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const normX = deltaX / dist;
          const normY = deltaY / dist;
          const sourcePadding = radius + 60; // node's radius + 10px
          const sx = d.source.x + sourcePadding * normX;
          return sx;
        })
        .attr("y1", (d: any) => {
          const deltaY = d.target.y - d.source.y;
          const deltaX = d.target.x - d.source.x;
          const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const normX = deltaX / dist;
          const normY = deltaY / dist;
          const sourcePadding = radius + 60; // node's radius + 10px
          const sy = d.source.y + sourcePadding * normY;
          return sy;
        })
        .attr("x2", (d: any) => {
          const deltaX = d.target.x - d.source.x;
          const deltaY = d.target.y - d.source.y;
          const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const normX = deltaX / dist;
          const normY = deltaY / dist;
          const targetPadding = radius + 60; // node's radius + 10px
          const tx = d.target.x;
          const offset = computeLinkOffset(d.source.id, d.target.id);
          return (
            tx + (Math.abs(deltaY) / deltaY) * offset - targetPadding * normX
          );
        })
        .attr("y2", (d: any) => {
          const deltaY = d.target.y - d.source.y;
          const deltaX = d.target.x - d.source.x;
          const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const normX = deltaX / dist;
          const normY = deltaY / dist;
          const targetPadding = radius + 60; // node's radius + 10px
          const ty = d.target.y;

          const offset = computeLinkOffset(d.source.id, d.target.id);
          return (
            ty - (Math.abs(deltaX) / deltaX) * offset - targetPadding * normY
          );
        });

      // 선 글씨 박스 위치 결정
      linkTextBackground.each(function (d: any) {
        const textSelection = d3.select(this);
        const tspans = textSelection.selectAll("rect");

        const tokens = wrapText(d.name); // 문자열을 줄바꿈하여 배열로 변환

        tspans.each(function (_, index) {
          d3.select(this)
            .attr("x", (d: any) => {
              const deltaX = d.target.x - d.source.x;
              const deltaY = d.target.y - d.source.y;
              const midX = (d.source.x + d.target.x) / 2;
              const offset = computeLinkOffset2(d.source.id, d.target.id);

              const textLength = tokens[index].length * 18; // 글자당 대략적인 픽셀 크기; 조정이 필요할 수 있음

              if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Link is more horizontal
                return midX - textLength / 2;
              } else {
                // Link is more vertical
                return (
                  midX + (Math.abs(deltaY) / deltaY) * -offset - textLength / 2
                );
              }
            })
            .attr("y", (d: any) => {
              const deltaY = d.target.y - d.source.y;
              const deltaX = d.target.x - d.source.x;
              const midY = (d.source.y + d.target.y) / 2;
              const offset = computeLinkOffset2(d.source.id, d.target.id);

              if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Link is more horizontal
                return (
                  midY + (Math.abs(deltaX) / deltaX) * offset - 20 + 20 * index
                ); // 텍스트 높이 고려
              } else {
                // Link is more vertical
                return midY - 20 + 20 * index; // 텍스트 높이 고려
              }
            })
            .attr("width", (d: any) => tokens[index].length * 18) // 글자당 대략적인 픽셀 크기; 조정이 필요할 수 있음
            .attr("height", 30);
        });
      });

      // 선 글씨 위치 결정
      linkText.each(function (d: any) {
        const textSelection = d3.select(this);
        const tspans = textSelection.selectAll("tspan"); // 현재 <text> 요소 내부의 모든 <tspan> 요소를 선택

        tspans.each(function (_, index) {
          d3.select(this)
            .attr("text-anchor", "middle")
            .attr("x", (d: any) => {
              const deltaX = d.target.x - d.source.x;
              const deltaY = d.target.y - d.source.y;
              const midX = (d.source.x + d.target.x) / 2;
              const offset = computeLinkOffset2(d.source.id, d.target.id);

              if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Link is more horizontal
                return midX;
              } else {
                // Link is more vertical
                return midX + (Math.abs(deltaY) / deltaY) * -offset;
              }
            })
            .attr("y", (d: any) => {
              const deltaX = d.target.x - d.source.x;
              const deltaY = d.target.y - d.source.y;
              const midY = (d.source.y + d.target.y) / 2;
              const offset = computeLinkOffset2(d.source.id, d.target.id);

              if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Link is more horizontal
                return midY + (Math.abs(deltaX) / deltaX) * offset;
              } else {
                // Link is more vertical
                return midY;
              }
            })
            .attr("dy", index === 0 ? "0" : `${1.2 * index}em`);
        });
      });

      nodeGroup.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    updateDimensions(); // 초기 로딩시에 한 번 실행

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      svg.selectAll("*").remove(); // 모든 자식 요소를 삭제
    };
  }, [relations, characterList]);

  const onClickCreateModalOpen = () => {
    setModalContent({
      isNewMode: true,
      characterList,
    });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        marginTop: "40px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {isLoading && (
        <div className="flex h-full w-full flex-row items-center justify-center overflow-hidden transition-all">
          <div className="animate-pulse text-2xl font-bold text-[#C55858]">
            로딩중...
          </div>
        </div>
      )}
      <svg ref={ref} className={isLoading ? "invisible" : ""}>
        <rect
          width="100%"
          height="100%"
          fill="#EFF1F7"
          className={isLoading ? "invisible" : ""}
        ></rect>
      </svg>
      <CreateRelationButton onClick={onClickCreateModalOpen}>
        관계 추가하기
      </CreateRelationButton>
      {modalContent && (
        <Modal
          closeModal={() => setModalContent(null)}
          maxWidth={972}
          maxHeight="100%"
        >
          <EditRelation
            {...modalContent}
            closeModal={() => setModalContent(null)}
          />
        </Modal>
      )}
      {characterModal && (
        <CharacterModal
          characterId={characterModal}
          closeModal={() => {
            setcharacterModal(null);
            queryClient.invalidateQueries({
              queryKey: workspaceQueryKeys.character(workspace_id),
            });
          }}
        />
      )}
    </div>
  );
};

export default NetworkGraph;
