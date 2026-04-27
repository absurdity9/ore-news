import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'w9x60sjf',
    dataset: 'production'
  },
  deployment: {
    appId: 'd9o0ahrk6z9pthubv62qd4qs',
    autoUpdates: true,
  }
})
