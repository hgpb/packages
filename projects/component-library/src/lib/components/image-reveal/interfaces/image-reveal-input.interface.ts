import {IImageRevealHandle} from './image-reveal-handle.interface';
import {IImageRevealViewport} from './image-reveal-viewport.interface';

export interface IImageRevealInput {
  viewports?: [IImageRevealViewport, IImageRevealViewport];
  height?: number;
  handle?: IImageRevealHandle;
}
