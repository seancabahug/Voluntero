import requests
import sys
import random

# This token must be changed every 1 hour.
# You can get a token by accessing your cookies.
# Since this a demo, anyone with your token can pretend to be you.
# DON'T SHARE YOUR TOKEN.

userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI1ZWY5MDJiZTFmMmIxZWIwYzgwYTgyYjciLCJpYXQiOjE1OTMzOTExOTIsImV4cCI6MTU5MzM5NDc5Mn0.fDrfcEU2Owut0ghbuEkE4dWCrTE2dKExtjK2o4z8VLE'

headers = {
    'Authorization': 'Bearer ' + userToken
}

first_word = [
    "Cleanup",
    "Save",
    "Help with",
    "Support"
]

second_word = [
    "the homeless",
    "the wild",
    "poor children",
    "natures beauty",
    "my garden"
]

for i in range(25):
    data = {
        'name': first_word[random.randint(0,3)] + " " + second_word[random.randint(0,3)] + " " + str(i + 1),
        'description': 'This is a really cool event description',
        'reward': i,
        'location': [random.randint(30, 50), random.randint(-120, -80)]
    }
    req = requests.post('http://172.20.144.1:8080/api/events/create', headers=headers, data=data)
    print(req.text)