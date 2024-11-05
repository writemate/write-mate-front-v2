import useClickAway from "@/hooks/workspace/plot/useClickAway";

interface UpdateModalProps {
  characterId: string;
  onClose: () => void;
}

export default function UpdateModal({
  characterId,
  onClose,
}: UpdateModalProps) {
  const ref = useClickAway(() => {
    onClose();
  });

  return (
    <div ref={ref} style={{ background: "black", color: "white" }}>
      {characterId}
    </div>
  );
}
