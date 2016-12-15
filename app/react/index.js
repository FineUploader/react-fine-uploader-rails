import RWR from 'react-webpack-rails';
RWR.run();

import HelloWorld from './components/hello-world';
import PhotosWrapper from './components/photos-wrapper';


RWR.registerComponent('HelloWorld', HelloWorld);
RWR.registerComponent('PhotosWrapper', PhotosWrapper);
