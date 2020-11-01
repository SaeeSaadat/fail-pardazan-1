#reference: 
#  https://medium.com/better-programming/introduction-to-locust-an-open-source-load-testing-tool-in-python-2b2e89ea1ff
from locust import HttpUser, task, between
import random
import json

class WebTester(HttpUser):
    wait_time = between(0.5, 3.0)

    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        pass

    def on_stop(self):
        """ on_stop is called when the TaskSet is stopping """
        pass

    @task(1)
    def sha256Test(self):
        theData = """{
            "a": 100,
            "b": 200
        }"""
        self.client.post("/nodejs/sha256", theData, headers={'content-type': 'application/json'})

    @task(2)
    def writeTest(self):
        a = random.randint(1,100)
        self.client.get(f"/nodejs/write?line={a}")


# run locust in nodejs folder and go to localhost:8089 to run the test