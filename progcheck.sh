#!/bin/bash
# ProgCheck startup

tmux new -sprogcheck \; \
  new-window -n mongo \; \
  new-window -n dev \; \
  select-window -t 1 \; \
  send-keys -t 1 'mongod --dbpath=./db --smallfiles' Enter \; \
  split-window -h \; \
  send-keys -t 1 'mongo progcheck_dev' Enter \; \
  select-window -t 2 \; \
  send-keys -t 2 'gulp build' Enter \; \
  split-window -h \; \
  send-keys -t 2 'node server/server' Enter \; \
  split-window -v \; \
  send-keys -t 2 'gulp watch' Enter

# mongo progcheck_dev

# node server/server

# gulp build

# gulp watch
