# sling2GPT

Technical Challenges:

- wanted to use proxty server to hold GH user info to avoid holding sensitive data on client server
  - Ended up not using proxy server and saving GH data to client's local storage :/
  - Difficult to configure and understand webpack's interaction and differences bw dev and build modes, even more confusing when the proxy server was still there
- Webpack.config and dev server continue to give headaches with github OAuth (hard to know where to send GH callback URL)
  - just used build and start whenever I wanted to test functionality
- 

Stretch:

- GH GUI Selected folders/files will be saved to a DB for quick reference?
- Update selected folders/files from DB-ed folders/files
