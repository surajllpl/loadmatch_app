# LoadMatch - Lite-App

Initial React Application Setup with Zustand :

    Peer Dependencies :

        npm i
        npm i zustand (for state management)

React Router Setup with Header,Footer and Outlet :

    Dependencies :

        npm i react-router-dom (for React routing)
        npm i dayjs (for date store)
        npm i react-icons (for nav icons)

    Tailwind CSS with Vite setup :

        npm install -D tailwindcss postcss autoprefixer
        npx tailwindcss init -p

### Feature : Building Image Hosting with Digital Ocean Spaces (AWS S3 alternative)

Front End

        - For the User to Upload the Image
        - Allow Drag and Drop
        - We can show a Preview

BackEnd

        - Handle Photos/ Files
        - Backend will call Spaces API to Save the images sent from the frontEnd

Problems :

        - Find out how to generate unique code that maps to the image the user uploaded.

Requirements :

AWS SDK for JavaScript S3 Client for Node.js, Browser and React Native.

        - npm install @aws-sdk/client-s3

## Deployment on Digital Ocean

        - create droplet
        - install docker
        - ssh key generation
        - ssh key
        - clone git repo
        - docker build
        - docker up

ports:

- 80:80 for default http port mapping
- 443:443 for default https port mapping

ports: - $NODE_LOCAL_PORT:$NODE_DOCKER_PORT
removing above ports from liteserver container to port mapping through ngnix

# Deployment and Domain Setup with SSL using Nginx on DigitalOcean Droplet

This guide provides step-by-step instructions for deploying a website on a DigitalOcean Droplet, adding a domain, and setting up SSL using Nginx.

1.  LogIn to DigitalOcean.
2.  Create a Droplet on DigitalOcean.

        - Choose Region
        - Select Datacenter
        - Select OS
        - Select Droplet Type & CPU options
        - Add Volume if Required(Managed DB).
        - Choose Authentication Method :
                - SSH key
                - Password
        - Hostname

3.  Generate a New SSH key pair with putty Generator on Windows/Mac/OS

- Download PuTTY
- Generate public/private key pair
- key passphrase - loadmatchllpl
- Type RSA

4. How to connect to DigitalOcean droplet using PuTTy on Windows

- Open PuTTy Configuration.
- Enter Droplet ipv4 into HostName
- Go to Connection -> Auth -> Browse Private key open
- Go to Session -> add droplet session name and save it.

Running Docker Compose :

For Development:

        docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

For Production:

        docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

# Managing SSH Keys and Configuring SSL on DigitalOcean

## 1. Generating an SSH Key Pair on Windows

1. **Install PuTTYgen:**

   - PuTTYgen is a tool included in the PuTTY suite used to generate SSH keys. If you have PuTTY installed, PuTTYgen is usually included.

2. **Run PuTTYgen:**

   - Open PuTTYgen from the Start menu or desktop shortcut.

3. **Generate Key Pair:**

   - In PuTTYgen:
     - Select `RSA` (or `ED25519` if you prefer).
     - Set the number of bits in the generated key to `2048` (or `4096` for increased security).
     - Click `Generate` and move your mouse around the blank area to create randomness.
     - Once the key is generated, you will see the `Public key` and `Private key`.

4. **Save Keys:**

   - **Save the Public Key:** Click `Save public key` and choose a location.
   - **Save the Private Key:** Click `Save private key`. Choose a secure location and optionally set a passphrase for extra security.
     - **Passphrase:** `loadmatchllpl`
     - **Location:** `E:\Office\ssh_key_loadmatch\tin-server-keys`

5. **Copy the Public Key:**
   - You can also copy the public key from the `Public key for pasting into OpenSSH authorized_keys file` field.

## 2. Adding SSH Key to DigitalOcean

1. **Log in to DigitalOcean:**

   - Access your DigitalOcean account.

2. **Navigate to SSH Keys:**

   - Go to `Settings > Security` or `Droplets > SSH Keys`.

3. **Add a New SSH Key:**
   - Click `Add SSH Key`.
   - Paste the copied public key into the `SSH Key Content` box.
   - Give it a descriptive name and click `Add SSH Key`.

## 3. Adding SSH Key to an Existing DigitalOcean Droplet

1. **Log in to the Existing Droplet:**

   - Use another method (username/password or an existing SSH key) to access the droplet.

2. **Add the Public Key:**

   - Open the `~/.ssh/authorized_keys` file using a text editor:
     ```bash
     nano ~/.ssh/authorized_keys
     ```
   - Paste your public key into this file and save it.

3. **Set Proper Permissions:**
   - Ensure the permissions are correct:
     - Set the permissions for the `authorized_keys` file to be readable and writable only by the user:
       ```bash
       chmod 600 ~/.ssh/authorized_keys
       ```
     - Set the permissions for the `.ssh` directory to be readable and accessible only by the user:
       ```bash
       chmod 700 ~/.ssh
       ```
   - You can verify permissions using:
     ```bash
     ls -ld ~/.ssh
     ls -l ~/.ssh/authorized_keys
     ```

## 4. Connecting to Remote Digital Ocean Droplet Server Using PuTTY

1. **Open PuTTY:**

   - Start PuTTY on your local machine.

2. **Configure Connection:**

   - **Host Name (or IP Address):** Enter your Droplet’s IP address.
   - **Port:** Set to `22`.
   - **Connection Type:** Select `SSH`.

3. **Specify the SSH Key:**

   - Go to `Connection > SSH > Auth`.
   - Click `Browse` next to `Private key file for authentication`.
   - Select your `.ppk` private key file.

4. **Save and Connect:**

   - Go to `Session`, enter a name under `Saved Sessions`, and click `Save`.
   - Click `Open` to connect.
   - Log in with the username (e.g., `root`), and you should be authenticated using the private key.

5. **Log in:**
   - When prompted, enter the username for your Droplet.
     - Typically, this is `root` unless you've created a different user.
   - **Login as:** `root`
   - **Passphrase for key:** `loadmatchllpl`

## 5. Connecting a Domain with SSL Certification

### 5.1 Buying and Connecting a Domain to GoDaddy

1. **Purchase a Domain:**

   - Visit [GoDaddy](https://www.godaddy.com).
   - Search for your desired domain name.
   - Complete the purchase process and register your domain.

2. **Connect Domain to SSL Certificate:**

   - **Access SSL Certificates:**

     - Log in to your GoDaddy account.
     - Navigate to `My Products > SSL Certificates`.

   - **Download SSL Certificate Files:**
     - Find your SSL certificate and download it.
     - Extract the downloaded ZIP file to get the SSL certificate files (e.g., `gd_bundle-g7-g1.crt`, `your_domain.crt`, and `your_domain.pem`).

### 5.2 Downloading SSL Certificates from GoDaddy

1. **Access SSL Certificate Management:**

   - Log in to your GoDaddy account.
   - Go to `My Products` and locate your SSL certificate.

2. **Download SSL Certificate Files:**

   - Go to the `Manage` section for your SSL certificate.
   - Download the SSL certificate files. Typically, you'll get:
     - A security certificate file (e.g., `gd_bundle-g7-g1.crt`).
     - Your domain’s certificate file (e.g., `your_domain.crt`).
     - A PEM file (e.g., `your_domain.pem`).

3. **Extract the Files:**
   - Extract the downloaded ZIP file to a directory on your local machine.

### 5.3 Transferring SSL Certificates to the Droplet

1. **Open PuTTY or PuTTYgen on Windows:**

   - Ensure you have PuTTY installed.

2. **Setting Permissions for SSH Private Key File**

   1. **Locate the Private Key File:**

      - Navigate to the folder where your private key file (`your_private_key.pem`) is stored.

   2. **Open File Properties:**

      - Right-click the private key file and select `Properties`.

   3. **Go to Security Tab:**

      - Click on the `Security` tab.

   4. **Edit Permissions:**

      - Click the `Edit` button to change permissions.

   5. **Set Permissions:**

      - **Remove Inherited Permissions:**
        - Click on `Advanced` to open `Advanced Security Settings`.
        - Click on `Disable inheritance` to remove inherited permissions.
        - Select `Remove all inherited permissions from this object`.
      - **Add Your User Account:**
        - Click `Add` to open the `Permission Entry` dialog.
        - In the `Enter the object names to select` field, type your username (e.g., `YourUsername`).
        - Click `Check Names` to verify, then click `OK`.
      - **Configure User Permissions:**
        - Select your username from the list.
        - In the `Permissions` box, check `Read`.
        - Uncheck any other permissions (e.g., `Write`, `Modify`).
        - Click `Apply` and `OK`.

   6. **Verify Permissions:**

      - Ensure that only your user account has `Read` permissions and that no other users or groups have permissions.

   7. **Confirm and Close:**
      - Click `OK` to close the `Properties` window.

   **Permissions Explanation:**

   - **Users:**
     - Only your user account should have `Read` permissions.
     - Ensure that other users and groups like `Administrators`, `SYSTEM`, or `Authenticated Users` do not have permissions to access the file.
   - **Permissions:**
     - **Read:** Allows your user to open and read the file, necessary for SSH authentication.
     - **Remove Write Permissions:** Prevents modification of the file, ensuring security.

> **SCP Command Breakdown:**

        scp -i path/to/your_private_key.pem /path/to/local_file username@ip-address:/path/to/destination

        -i path/to/your_private_key.pem: Specifies the path to your private key file.

        /path/to/local_file: The path to the file on your local machine that you want to transfer.

        username@ip-address: The username and IP address of your Droplet.

        /path/to/destination: The path on the Droplet where you want to transfer the file.

- Private Key File Path: E:\Office\ssh_key_loadmatch\tin-server-keys\tin-server1_privatekey.pem

- Local SSL Certificate Files:

        E:\Office\ssh_key_loadmatch\ssl\b5f5ef3c61111ec0.crt
        E:\Office\ssh_key_loadmatch\ssl\b5f5ef3c61111ec0.pem
        E:\Office\ssh_key_loadmatch\ssl\gd_bundle-g2-g1.crt

- Droplet IP Address: 142.93.213.182
- Destination Directory on Droplet: /etc/ssl/private/
- Username: root

- Commands to transfer SSL files :

        scp -i E:\Office\ssh_key_loadmatch\tin-server-keys\tin-server1_privatekey.ppk E:\Office\ssh_key_loadmatch\ssl\b5f5ef3c61111ec0.crt root@142.93.213.182:/etc/ssl/private/
        scp -i E:\Office\ssh_key_loadmatch\tin-server-keys\tin-server1_privatekey.ppk E:\Office\ssh_key_loadmatch\ssl\b5f5ef3c61111ec0.pem root@142.93.213.182:/etc/ssl/private/
        scp -i E:\Office\ssh_key_loadmatch\tin-server-keys\tin-server1_privatekey.ppk E:\Office\ssh_key_loadmatch\ssl\gd_bundle-g2-g1.crt root@142.93.213.182:/etc/ssl/private/

3. **Use SCP (Secure Copy Protocol) to Transfer Files:**

   - Open a command prompt or PowerShell window.
   - Use the `scp` command to transfer files from your local machine to the Droplet. Replace `username`, `ip-address`, and file paths accordingly:
     ```bash
     scp -i path/to/your_private_key.pem /path/to/your_domain.crt username@ip-address:/path/to/destination
     scp -i path/to/your_private_key.pem /path/to/your_domain.pem username@ip-address:/path/to/destination
     scp -i path/to/your_private_key.pem /path/to/gd_bundle-g7-g1.crt username@ip-address:/path/to/destination
     ```

4. **Verify File Transfer:**

- Log in to your Droplet using PuTTY and check the destination directory to ensure the files have been transferred.

- Navigate to the Destination Directory: cd /etc/ssl/private/

- List Files in the Directory: ls -l

- Check File Permissions: ls -l
  You should see something like this:

  -rw------- 1 root root 1234 Aug 1 12:34 your_domain.pem
  -rw-r--r-- 1 root root 5678 Aug 1 12:34 your_domain.crt
  -rw-r--r-- 1 root root 91011 Aug 1 12:34 gd_bundle-g7-g1.crt

- Set Proper Permissions (if needed):

  If the permissions are not set correctly, you can adjust them:

      bash
      Copy code
      sudo chmod 600 /etc/ssl/private/your_domain.pem
      sudo chmod 644 /etc/ssl/private/your_domain.crt
      sudo chmod 644 /etc/ssl/private/gd_bundle-g7-g1.crt

### 5.4 Installing and Configuring Nginx for SSL

1. **Install Nginx (if not already installed):**

   - On your Droplet, run:
     ```bash
     sudo apt update
     sudo apt install nginx
     ```

2. **Configure Nginx for SSL:**

   - Create or edit the Nginx configuration file for your domain:
     ```bash
     sudo nano /etc/nginx/sites-available/loadmatch.app
     ```
   - Add the following configuration, adjusting paths to your SSL certificate files:

     ```nginx
     server {
         listen 80;
         server_name loadmatch.app www.loadmatch.app;

         return 301 https://$host$request_uri;
     }

     server {
         listen 443 ssl;
         server_name loadmatch.app www.loadmatch.app;

         ssl_certificate /path/to/your_domain.crt;
         ssl_certificate_key /path/to/your_domain.pem;
         ssl_trusted_certificate /path/to/gd_bundle-g7-g1.crt;

         location / {
             proxy_pass http://localhost:80;
             proxy_set_header Host $host;
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header X-Forwarded-Proto $scheme;
         }
     }
     ```

3. **Create a Symbolic Link:**

   - Enable the new configuration by creating a symbolic link:
     ```bash
     sudo ln -s /etc/nginx/sites-available/loadmatch.app /etc/nginx/sites-enabled/
     ```

4. **Test Nginx Configuration:**

   - Check for syntax errors:
     ```bash
     sudo nginx -t
     ```

5. **Reload Nginx:**
   - Apply the new configuration:
     ```bash
     sudo systemctl reload nginx
     ```

# Check ownership and permissions

        ls -l /etc/ssl/private/

- Set ownership to root

        sudo chown root:root /etc/ssl/private/\*

- Set permissions to 600 (read/write for owner only)

        sudo chmod 600 /etc/ssl/private/\*

Edit Nginx Configuration File:

Ensure you are editing the correct Nginx configuration file. You should modify the loadmatch.app configuration file located in /etc/nginx/sites-available/ or /etc/nginx/conf.d/.

You can edit the file using a text editor like nano:

bash
Copy code
sudo nano /etc/nginx/sites-available/loadmatch.app

## Running Docker Compose :

- For Development:

        docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

- For Production:

        docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
