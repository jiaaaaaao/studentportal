package student.portal;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentInfoController {

    /**
     * The JSON object sent from React should include exact same fields as
     * StudentInfo.class here in java, otherwise the JSON conversion library
     * here cannot correctly convert the JSON object embedded as RequestBody of
     * post HTTP request into StudentInfo java object.
     */
    @CrossOrigin
    @RequestMapping(value = "/studentInfo", method = RequestMethod.POST)
    public ValidateResponse putstudentInfo(@RequestBody StudentInfo studentInfo) {
	createstudentInfo(studentInfo);

	return new ValidateResponse("haha");
    }

    private void createstudentInfo(StudentInfo studentInfo) {
	Connection connection;
	try {
	    connection = createConnection();
	    Statement stmt = connection.createStatement();
	    String sql1 = new StringBuilder().append("INSERT INTO Registration").append(" VALUES ('")
		    .append(studentInfo.name).append("','").append(-1).append("','").append(studentInfo.chineseScore)
		    .append("','").append(-1).append("')").toString();
	    stmt.executeUpdate(sql1);

	} catch (SQLException e) {
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	}

    }

    @CrossOrigin
    @RequestMapping(value = "/studentInfo", method = RequestMethod.GET)
    public StudentInfo studentInfo(@RequestParam(value = "name") String name) {

	StudentInfo test = new StudentInfo(0, null, 0);
	queryDatabase(test, name);

	return test;

    }

    private void queryDatabase(StudentInfo test, String name) {
	try {
	    Connection connection = createConnection();
	    Statement stmt = connection.createStatement();
	    String sql2 = "SELECT StudentName, EnglishScore, ChineseScore, MathScore FROM Registration WHERE StudentName="
		    + name;

	    ResultSet rs = stmt.executeQuery(sql2);

	    while (rs.next()) {
		// Retrieve by column name
		String studentName = rs.getString("StudentName");
		double englishScore = rs.getDouble("EnglishScore");
		double chineseScore = rs.getDouble("ChineseScore");
		double mathScore = rs.getDouble("MathScore");

		test.name = studentName;
		test.chineseScore = chineseScore;
	    }

	} catch (SQLException e) {
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	}

    }

    private Connection createConnection() throws SQLException {
	try {
	    Class.forName("org.postgresql.Driver");
	} catch (ClassNotFoundException e) {
	    e.printStackTrace();
	}
	Connection connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/mydb", "jiaowang",
		"jiaowang");
	System.out.println("create connection");

	return connection;
    }
}
