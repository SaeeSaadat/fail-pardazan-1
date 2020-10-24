#reference: 
#  https://medium.com/better-programming/introduction-to-locust-an-open-source-load-testing-tool-in-python-2b2e89ea1ff
from locust import HttpUser, task, between
import random

class WebTester(HttpUser):

    def on_start(self):
        pass
    def on_stop(self):
        pass

    @task(1)
    def sha256Test(self):
        self.client.post("/nodejs/sha256", {"a": 100, "b": 250})

    @task(2)
    def writeTest(self):
        a = random.randint(1,100)
        self.client.get("nodejs/write?line=" + a)


# run locust in nodejs folder and go to localhost:8089 to run the test