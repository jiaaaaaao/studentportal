package student.portal;

public class StudentInfo {
    public  long id;
    public String name;
    double chineseScore;

    public StudentInfo(long id, String name, double chineseScore) {
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

}
