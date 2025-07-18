const path = require('path')
const {
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require('next/constants')
module.exports = (phase) => {
  let distDir = 'temp'
  if (phase == PHASE_PRODUCTION_BUILD) {
    distDir = 'temp'
  } else if (phase == PHASE_PRODUCTION_SERVER) {
    distDir = '.next'
  }
  return {
    distDir: distDir,
    basePath: '/crm',
    // images: {
    //   domains: ['cdn.timviec365.vn'],
    // },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
        {
          protocol: "http",
          hostname: "**",
        },
      ],
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  }
}
