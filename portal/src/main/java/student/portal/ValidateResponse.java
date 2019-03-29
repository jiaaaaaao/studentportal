package student.portal;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ValidateResponse {
    private String response;

    public ValidateResponse(@JsonProperty("response") String response) {
	this.response = response;
    }

    public String getResponse() {
	return response;
    }

    public void setResponse(String response) {
	this.response = response;
    }
}
