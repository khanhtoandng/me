/**
 * This script deploys the application to Render.
 * Run it with: node scripts/deploy.js
 */

const https = require('https');
const { execSync } = require('child_process');

// Render deploy hook URL
const RENDER_DEPLOY_HOOK = "https://api.render.com/deploy/srv-d0nfbd0dl3ps73a6u480?key=2XDLpH-mG08";

console.log('Deploying to Render...');

// Trigger the deploy hook
https.get(RENDER_DEPLOY_HOOK, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 201) {
      console.log('Deployment triggered successfully!');
      console.log('Deployment status:', data);
      console.log('Your application will be available shortly at your configured domain.');
    } else {
      console.error('Failed to trigger deployment:', res.statusCode);
      console.error('Response:', data);
    }
  });
}).on('error', (err) => {
  console.error('Error triggering deployment:', err.message);
});
