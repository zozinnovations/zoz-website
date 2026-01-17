# ZOZ Innovations Website

This repository contains the source code for the official corporate website of ZOZ INNOVATIONS FZCO.

The website presents ZOZ’s Information Technology and Artificial Intelligence services, expertise, and digital products.

## Purpose
- Corporate brand presence
- Service and expertise overview
- Product references (e.g. Sugar Tax UAE Tool)
- Thought leadership and blog content

## Disclaimer
This website is for informational purposes only and does not constitute legal, tax, or professional advice.

## Install on VM
4. sudo apt update && sudo apt upgrade -y
   sudo apt install -y docker.io
   sudo systemctl enable docker
   sudo systemctl start docker
   sudo apt-get update
   sudo apt-get install -y ca-certificates curl gnupg
   sudo install -m 0755 -d /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   sudo chmod a+r /etc/apt/keyrings/docker.gpg
   
   echo \
   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
   $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

   sudo apt-get update
   sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

   adduser --disabled-password deploy
   usermod -aG docker deploy
   mkdir -p /home/deploy/.ssh
   ssh-keygen -t ed25519 -C "zoz-website-deploy" => /home/deploy/.ssh/github_deploy_key
   
   chown deploy:deploy /home/deploy/.ssh/github_deploy_key*
   chmod 600 /home/deploy/.ssh/github_deploy_key
   chmod 644 /home/deploy/.ssh/github_deploy_key.pub

   GitHub
    https://github.com/zozinnovations/zoz-website   
    Settings → Deploy keys
    ZOZ Website Server Deploy

   cat /home/deploy/.ssh/github_deploy_key.pub

    Allow write access

   vi /home/deploy/.ssh/config

Host github.com
  IdentityFile /home/deploy/.ssh/github_deploy_key
  User git

    chown deploy:deploy /home/deploy/.ssh/config
    chmod 600 /home/deploy/.ssh/config

    mkdir -p /opt/zoz-website
    chown -R deploy:deploy /opt/zoz-website
    chmod 755 /opt/zoz-website

    su - deploy
    ssh -T git@github.com

    Varaiblen (Secrets) in GitHub setzen => GitHub → Repo → Settings → Secrets and variables → Actions → New repository secret

        SSH_HOST
        SSH_USER
        SSH_PRIVATE_KEY
        SSH_PORT
        DEPLOY_PATH
        GHCR_TOKEN
        GHCR_USERNAME
 