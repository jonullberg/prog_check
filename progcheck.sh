#!/bin/bash
# Prog Check Dev Startup

SESSION_NAME="pc-dev"

cd ~/code/projects/prog_check

tmux has-session -t ${SESSION_NAME}

if [ $? != 0 ]
  then
  # Create the session
  tmux new-session -s ${SESSION_NAME} -n subl -d

  # FIrst window (0) -- subl and console
  tmux send-keys -t ${SESSION_NAME} 'subl .' Enter

  # Dev-Server (1)
  tmux new-window -n db -t ${SESSION_NAME}
  tmux send-keys -t ${SESSION_NAME}:1 'mongod --dbpath=./db --smallfiles' Enter
  tmux split-window -h
  tmux send-keys -t ${SESSION_NAME}:1 'mongo progcheck_dev' Enter

  # Testing (2)
  tmux new-window -n dev -t ${SESSION_NAME}
  tmux send-keys -t ${SESSION_NAME}:2 'nodemon server/server -w ./server' Enger
  tmux split-window -h
  tmux send-keys -t ${SESSION_NAME}:2 'gulp watch'

  # Go back to bash
  tmux select-window -t ${SESSION_NAME}:0
  tmux send-keys -t ${SESSION_NAME}:0 'gulp build' Enter
fi
tmux attach -t ${SESSION_NAME}

# tmux new -sprogcheck \; \
#   send-keys -t 0 'subl .' Enter \; \
#   new-window -n mongo \; \
#   new-window -n dev \; \
#   select-window -t 1 \; \
#   send-keys -t 1 'mongod --dbpath=./db --smallfiles' Enter \; \
#   split-window -h \; \
#   send-keys -t 1 'mongo progcheck_dev' Enter \; \
#   select-window -t 2 \; \
#   send-keys -t 2 'gulp build' Enter \; \
#   split-window -h \; \
#   send-keys -t 2 'nodemon server/server -w ./server' Enter \; \
#   split-window -v \; \
#   send-keys -t 2 'gulp watch' Enter
