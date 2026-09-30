import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '80wu0o5s',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
