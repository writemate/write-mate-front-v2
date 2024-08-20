import Image, { StaticImageData } from 'next/image';
import {
  FeatrueInfoContainer, FeatureContainer, FeatureTitle,ColorableText, FeatureImage,
  FeatureDescription, FeatureLink, CommentContainer, FeatureComment, BoldableText
} from '@/styles/home/Home.styles';

import React from 'react';

export type FeatureType = {
  title: {text: string, color: boolean}[];
  description: string;
  linkText: string;
  image: StaticImageData;
  imageAlt: string;
  comment: {text: string, bold: boolean}[][];
  direction: 'left' | 'right';
  background: boolean;
}

export default function FeaturesBlock({title, description, linkText, image, imageAlt, comment, direction, background}: FeatureType) {
  return (
    <FeatureContainer $background={background}>
      {direction === 'left' && <FeatureImage src={image} alt={imageAlt}/>}
      
      <FeatrueInfoContainer>
        <FeatureTitle>
          {title.map((text, index) => <ColorableText key={index} $color={text.color}>{text.text}</ColorableText>)}
        </FeatureTitle>
        <FeatureDescription>{description}</FeatureDescription>
        <FeatureLink href="/signup">{linkText}</FeatureLink>
        <CommentContainer>
          {comment.map((comment, index) => (
            <FeatureComment key={index} $position={index % 2 === 1 ? 'left' : 'right'}>
              {comment.map((text, index) => (
                <BoldableText key={index} $bold={text.bold}>{text.text}</BoldableText>
              ))}
            </FeatureComment>
          ))}
        </CommentContainer>
      </FeatrueInfoContainer>

      {direction === 'right' && <FeatureImage src={image} alt={imageAlt}/>}
    </FeatureContainer>
  );
}
