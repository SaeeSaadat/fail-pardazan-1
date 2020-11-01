from locust import HttpUser, task, between
import json

class WebsiteTestUser(HttpUser):
    wait_time = between(0.5, 3.0)
    
    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        pass

    def on_stop(self):
        """ on_stop is called when the TaskSet is stopping """
        pass

    @task(1)
    def hello_world(self):
        self.client.get("http://185.110.189.218/go/write?line=56")

    # @task(1)
    # def hello_world(self):
    #     self.client.post("http://185.110.189.218/go/sha256", json.dumps({"A":"4", "B":"6"}))