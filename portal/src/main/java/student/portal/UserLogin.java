package student.portal;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserLogin {
	public String username;
	public String password;
	
	public UserLogin(@JsonProperty("username") String username, @JsonProperty("password") String password) {
		this.username = username;
		this.password = password;
		
	    }
	
	public String getUsername() {
		return username;
	    }
	
	public String getPassword() {
		return password;
	}
	
	public void setUsername(String username) {
		this.username = username;
	    }
	
	public void setPassword(String password) {
		this.password=password;
	}
}
