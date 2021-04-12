#! /bin/bash

m=$(lsof -t -i:'3000')
if [ -z $m ]
then
    echo "No server running on 3000"
else
    kill $m
    echo "Killed process on port 3000"
fi