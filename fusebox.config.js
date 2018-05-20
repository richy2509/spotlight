const {
  FuseBox,
  Sparky,
  QuantumPlugin,
  WebIndexPlugin,
  LESSPlugin,
  CSSPlugin
} = require("fuse-box");
const {
  merge
} = require("lodash");
const path = require("path");
const LessPluginCleanCSS = require("less-plugin-clean-css");
const cleanCSSPlugin = new LessPluginCleanCSS({
  advanced: true
});
const express = require("express");

/** -------------------------------------
 * CONFIGURATIONS
 */

// Settings
const libraryName = "richy2509.spotlight";
const globalName = "Spotlight";

// Default fusebox configuration
const fuseConfig = {
  homeDir: "src",
  tsConfig: "tsconfig.json",
  package: {
    name: libraryName,
    entry: "index.ts",
  },
  globals: {
    default: globalName
  },
  plugins: [
    WebIndexPlugin(), [LESSPlugin({
        paths: [
          path.resolve(__dirname, "node_modules")
        ],
        plugins: [cleanCSSPlugin]
      }),
      CSSPlugin()
    ]
  ]
};

// Quantum configuration for bundles
const quantumPluginConfig = {
  bundleMin: {
    uglify: {
      compress: {
        drop_console: true
      }
    },
    treeshake: true,
    ensureES5: true,
  },
  bundleStandalone: {
    uglify: {
      compress: {
        drop_console: false
      }
    },
    treeshake: true,
    ensureES5: true,
    bakeApiIntoBundle: `${libraryName}.min.js`
  }
};

/** -------------------------------------
 * TASKS
 */

// Default
Sparky.task("default", ["clean", "bundle-min", "bundle-standalone"], () => {});
// Build bundle standalone and copy to test directory
Sparky.task("bundle-to-test", ["bundle-standalone", "copy-test-file"], () => {});

// Clean
Sparky.task("clean", () => {
  return (
    Sparky.src("bundle/")
    .clean("bundle/min/")
    .clean("bundle/standalone/")
  );
});

// Bundle the library minimized with external fusebox api
Sparky.task("bundle-min", () => {
  // Initialize with merge config
  const initConfig = merge({}, fuseConfig, {
    output: "bundle/min/$name.js"
  }, {
    plugins: [QuantumPlugin(quantumPluginConfig.bundleMin)]
  });
  const fuse = FuseBox.init(initConfig);

  // Create bundle
  fuse.bundle(`${libraryName}.min.js`)
    .target("browser")
    .instructions(`>index.tsx`);

  // Run build
  return fuse.run();
});

// Bundle the library minimized with include fusebox api
Sparky.task("bundle-standalone", () => {
  // Initialize with merge config
  const initConfig = merge({}, fuseConfig, {
    output: "bundle/standalone/$name.js",
    plugins: [QuantumPlugin(quantumPluginConfig.bundleStandalone)]
  });
  const fuse = FuseBox.init(initConfig);

  // Create bundle
  fuse.bundle(`${libraryName}.min.js`)
    .target("browser")
    .sourceMaps(true)
    .instructions(`>index.tsx`);

  // Run build
  return fuse.run();
});

// Copy bundle standalone to test directory
Sparky.task("copy-test-file", () => {
  return Sparky.src("bundle").dest("test");
});