package student.portal;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StudentInfo {
    public long id;
    public String name;
    public double chineseScore;
//@JsonProperty("id")里的id和react里设定的id是一个id，就是同一个名字，后面的long id 可以随便取，this.id =id是对应的public long id. 
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
