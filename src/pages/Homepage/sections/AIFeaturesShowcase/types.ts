
import { ReactNode } from 'react';

export interface CompareSliderData {
  beforeImage: string;
  beforeAlt: string;
  beforeLabel: string;
  afterImage: string;
  afterAlt: string;
  afterLabel: string;
}

export interface FeatureData {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  animation: ReactNode;
  model: string;
  compareSlider: CompareSliderData;
  technicalDetails: string;
  integrationInfo: string;
}
  