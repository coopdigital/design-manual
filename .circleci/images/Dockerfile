# Based on the pre-built CircleCI Node image
# See https://circleci.com/docs/2.0/circleci-images/#nodejs
FROM circleci/node:latest
LABEL maintainer="matt.tyas@coopdigital.co.uk"

WORKDIR /usr/src/app

# Add Ruby
RUN sudo apt-get install gpgv2
RUN sudo curl -sSL https://rvm.io/mpapis.asc | gpg --import --no-tty
RUN sudo apt-get update
RUN sudo \curl -sSL https://get.rvm.io | bash -s stable --ruby
RUN sudo rm -rf /var/lib/apt/lists/*

# Install Bundler
RUN sudo gem install bundler
