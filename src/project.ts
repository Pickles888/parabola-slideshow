import {makeProject} from '@motion-canvas/core';

import main from './scenes/main?scene';
import info from './scenes/info?scene'

export default makeProject({
  scenes: [main, info],
});
