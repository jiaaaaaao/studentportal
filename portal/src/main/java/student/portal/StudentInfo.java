package student.portal;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StudentInfo {
    public long id;
    public String name;
    public double chineseScore;

    public StudentInfo(@JsonProperty("id") long id, @JsonProperty("name") String name,
	    @JsonProperty("chineseScore") double chineseScore) {
	this.id = id;
	this.name = name;
	this.chineseScore = chineseScore;
    }

    public long getId() {
	return id;
    }

    public String getName() {
	return name;
    }

    public double getChineseScore() {
	return chineseScore;
    }

    public void setId(long id) {
	this.id = id;
    }

    public void setName(String name) {
	this.name = name;
    }

    public void setChineseScore(double chineseScore) {
	this.chineseScore = chineseScore;
    }

}
