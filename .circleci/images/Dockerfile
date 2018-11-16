# Based on the pre-built CircleCI Node image
# See https://circleci.com/docs/2.0/circleci-images/#nodejs
FROM circleci/node:latest
LABEL maintainer="matt.tyas@coopdigital.co.uk"

# Add Ruby
RUN sudo apt-get update \
	&& sudo apt-get install -y \
		ruby-build -v 2.5.1 \
	&& sudo rm -rf /var/lib/apt/lists/*

# Install Bundler
RUN sudo gem install bundler
