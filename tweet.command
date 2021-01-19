#!/usr/local/bin/python3
import os

def init():
     os.system("killall node")
def change_directory():
    os.chdir(os.getcwd() + "/Desktop/Projects/Twitter-Tweet-Stealer")
  
def start_fe():
    os.system("npm start && nodemon Backend")


def start_be():
    os.system("nodemon Backend")


init()
change_directory()
start_fe()
# start_be()