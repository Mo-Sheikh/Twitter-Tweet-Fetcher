#!/usr/local/bin/python3
import os

def change_directory():
    os.chdir(os.getcwd() + "/Desktop/Projects/Twitter-Tweet-Stealer")
    return
def start_fe():
    os.system("npm start")
    return

def start_be():
    os.system("nodemon Backend")


change_directory()
start_fe()
# start_be()