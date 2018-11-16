# Based on the pre-built CircleCI Node image
# See https://circleci.com/docs/2.0/circleci-images/#nodejs
FROM circleci/node:latest
LABEL maintainer="matt.tyas@coopdigital.co.uk"

# Add Ruby
RUN sudo apt-get install gpgv2
RUN sudo curl -sSL https://rvm.io/mpapis.asc | gpg --import --no-tty
RUN sudo apt-get update
RUN sudo \curl -sSL https://get.rvm.io | bash -s stable --ruby

# Install Bundler
FROM ruby:2.5.1
RUN gem install bundler

FROM circleci/node:latest
