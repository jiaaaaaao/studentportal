package student.portal;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentInfoController {

    @CrossOrigin
    @RequestMapping(value = "/studentInfo", method = RequestMethod.GET)
    public StudentInfo studentInfo(@RequestParam(value="name") String name) {
	
	StudentInfo test = new StudentInfo(0,null,0);
	queryDatabase(test,name);
	
	return test;

    }

    private void queryDatabase(StudentInfo test, String name) {
	 try {
	    Connection connection = createConnection();
	    Statement stmt = connection.createStatement();
	    String sql2 = "SELECT StudentName, EnglishScore, ChineseScore, MathScore FROM Registration WHERE StudentName="+name;

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
