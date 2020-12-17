# Official project releases
=====================

This repo is used to build a Docker container that serves the codeorigin site for jQuery and related projects. It is designed to deploy easily, and includes a "break glass in case of emergency" minimal config mode should codeorigin need to be redeployed urgently.

## Build a local copy

To build a local container (defaults to "break glass" mode):

1. Install Docker
1. Clone this repo, and `cd` into it
1. Build the image: `docker build -t releases ./`
1. Run the container, exposing port 80: `docker run -p 127.0.0.1:80:80/tcp releases`
1. To exit the container, press `ctrl+c`

To build a local container in deployment mode (redirecting any requests without the magic header that indicates an origin pull), build the container with the header value in an environment variable:

1. Install Docker
1. Clone this repo, and `cd` into it
1. Generate a random string for the environment variable: ``CDN_ACCESS_KEY=`openssl rand -hex 16` ``
1. Build the image: `docker build -t prod-releases --build-arg CDN_ACCESS_KEY=$CDN_ACCESS_KEY ./`
1. Run the container, exposing port 80: `docker run -p 127.0.0.1:80:80/tcp prod-releases`
1. To exit the container, press `ctrl+c`

Note that you will need to keep track of `$CDN_ACCESS_KEY` and add it to the headers sent for origin pulls. To test whether this is working correctly, you can use `curl`:

* This should always redirect to `code.jquery.org`: `curl -i localhost/jquery-3.1.1.js`
* This should always deliver a copy of the file (don't forget to set the environment variable in your current shell): `curl -i -H "cdn-access: ${CDN_ACCESS_KEY}" localhost/jquery-3.1.1.js`

## Build the production site

To deploy, first generate the CDN access key. Next, you'll need to configure the container host to build from the Dockerfile in this repository, and use the CDN access key as a build argument. Finally, you'll configure the CDN to send both the Host header and the access key during origin pulls.

1. Generate the access key: ``CDN_ACCESS_KEY=`openssl rand -hex 16` ``
1. Configure the container host to build from this repo, and set this build variable: `CDN_ACCESS_KEY=(Insert the value of $CDN_ACCESS_KEY here)`
1. Create the magic header and the host header at the CDN: `cdn-access: (Insert the value of $CDN_ACCESS_KEY here)|Host: (insert URL to app container)`

## In case of emergency

If you need to deploy a codeorigin container immediately, or if there are origin pull failures and you're not sure why, deploy without setting the `CDN_ACCESS_KEY` environment variable. The codeorigin server will respond to all requests without redirecting non-origin pulls to the CDN, so this should be only used in case of emergencies.

## Add or update project release files

To add a new release or update an existing one, simply commit the new file to the `cdn` directory and merge to the `main` branch. The container will rebuild automatically.
