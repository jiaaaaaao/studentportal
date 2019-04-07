package student.portal;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentInfoController {

    @CrossOrigin
    @RequestMapping(value = "/studentInfo/1", method = RequestMethod.POST)
    public void update(@RequestBody StudentInfo student) {
	System.out.println("put&update " + student.name + student.chineseScore);
	String updname = student.name;
	double updchinesescore = student.chineseScore;

	updateInfo(updname, updchinesescore);

    }

    private void updateInfo(String updname, double updchinesescore) {
	Connection connection;
	try {
	    connection = createConnection();
	    Statement stmt = connection.createStatement();
	    String sql = "UPDATE Registration  SET ChineseScore = '" + updchinesescore + "'  WHERE StudentName ='"
		    + updname + "'";
	    stmt.executeUpdate(sql);

	} catch (SQLException e) {
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	}

    }

    // delete----------------------------------------------
    @CrossOrigin
    @DeleteMapping("/studentInfo/{name}")
    public ResponseEntity<String> delete(@PathVariable String name) {
	System.out.println("Fetching & Deleting Student " + name);
	String deleteName = name;
	Response result = new Response(null);
	boolean isExists = isExist(deleteName);

	if (!isExists) {
	    System.out.println("Unable to delete. Student " + deleteName + " not found");
	    result.response = "Not found";
	    return new ResponseEntity<>("not found", HttpStatus.NOT_FOUND);

	} else {
	    boolean isSuccess = deleteName(deleteName);
	    return isSuccess ? new ResponseEntity<>("hello", HttpStatus.OK)
		    : new ResponseEntity<>("database", HttpStatus.BAD_REQUEST);
	}
    }

    private boolean deleteName(String deleteName) {
	boolean result = false;

	try {
	    Connection connection = createConnection();
	    Statement stmt = connection.createStatement();
	    String sql = "DELETE  FROM Registration WHERE StudentName ='" + deleteName + "' ";
	    stmt.execute(sql);
	    result = true;
	} catch (SQLException e1) {
	    e1.printStackTrace();
	}

	return result;

    }

    private boolean isExist(String name) {
	Connection connection;
	try {
	    connection = createConnection();
	    Statement stmt = connection.createStatement();
	    String sql = "SELECT * FROM Registration WHERE StudentName ='" + name + "' ";
	    ResultSet rs = stmt.executeQuery(sql);
	    if (rs.next()) {
		return true;
	    }
	} catch (SQLException e) {
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	}
	return false;
    }
    // ------------------------------------------------------------

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
	    String sql2 = "SELECT StudentName, EnglishScore, ChineseScore, MathScore FROM Registration WHERE StudentName='"
		    + name + "'";

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
