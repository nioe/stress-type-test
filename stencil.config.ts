import {Config} from '@stencil/core';
import {sass} from "@stencil/sass";
import {appRoot} from "./src/global/constants";

export const config: Config = {
  globalStyle: 'src/global/app.scss',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
      baseUrl: `https://pfoteneffekt.com/${appRoot}`,
      copy: [
        {src: '../node_modules/typeface-poppins/files', dest: 'assets/fonts/poppins'}
      ]
    },
  ],
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/global/partials/_baseline.scss',
      ]
    })
  ]
};
