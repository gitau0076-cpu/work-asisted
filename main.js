const numbers = [4, -2, 15, 8, -7, 23, 1]

const doubled = numbers.map (num => num * 2);
console.log("Doubled numbers:", doubled);

const nonNegative = numbers.filter(n => n >= 0);
console.log("Non-negative numbers:", nonNegative);

const firstgreaterThan10 = numbers.find(num => num > 10);
console.log("First number greater than 10:", firstgreaterThan10);

const product = numbers.reduce((acc, n) => acc * n, 1);
console.log("Product of all numbers:", product);

const hasNegative = numbers.some(n => n < 0);
console.log("Has negative:", hasNegative);

const sortedSmallestFirst = [...numbers].sort((a, b) => a - b);
console.log("Sorted numbers:", sortedSmallestFirst);
console.log("Original array remains untouched:", numbers);

  // PART 2- Objects 

  const person ={
    firstName: "Moses",
    lastName: "Oketch",
    age : 30,
    hobbies: ["reading", "coding", "hiking"],
    address: {
        street: "123 Main St",
        city: "Nairobi",
        country: "Kenya"
    }

  }
  console.log("City:", person.address.city);
  console.log("Last Name:", person["lastName"]);

  person.phone = "123-456-7890";
  console.log("Phone:", person.phone);
  delete person.phone;
  console.log("Phone after deletion:", person.phone);

    const { firstName, hobbies } = person;
    console.log("First Name:", firstName);
    console.log("Hobbies:", hobbies);

    const grades = { math: 95, english: 88, science: 92 };
    for (const [subject, score] of Object.entries(grades)) {
        console.log(`${subject}:${score}`);
    }
    // PART 3- Arrays of Objects
    const students = [
        { name: "Esther", age: 20, grade: 90, major: "Computer Science" },
        { name: "Barbra", age: 22, grade: 80, major: "Mathematics" },
        { name: "Charlie", age: 19, grade: 95, major: "Computer Science" },
        { name: "Derrick", age: 21, grade: 88, major: "Chemistry" },
        { name: "Eva", age: 23, grade: 92, major: "Computer Science" } ,
    ];

    const allNames = students.map(s => s.name);
    console.log("All student names:", allNames);

    const highGradeStudents = students.filter(s => s.grade > 80);
    console.log("Students with grades above 80:", highGradeStudents);

    const charlie = students.find(s => s.name === "Charlie");
    console.log("Charlie:", charlie);

    const avgGrade = students.reduce((sum, s) => sum + s.grade, 0) / students.length;
    console.log("Average grade:", avgGrade);

    const csMajors = students.filter(s => s.major === "Computer Science");
    console.log("Computer Science majors:", csMajors);

    const sortedByGrade = [...students].sort((a, b) => a.grade - b.grade);
    console.log("Students sorted by grade:", sortedByGrade);

    const hasStudentAbove90 = students.some(s => s.grade > 90);
    console.log("Is there any student with grade above 90?", hasStudentAbove90);

    const allPassing = students.every(s => s.grade >= 60);
    console.log("Do all students have passing grades?", allPassing);

    // PART 4-JSON

    const postsJson = '[{"id": 1, "title": "Welcome", "Likes":12, "published":true},{"id": 2, "title": "Draft ideas", "Likes":0,"published":false},{"id": 3, "title": "Week 4 recap", "Likes":30,"published":true}]';
    console.log(typeof postsJson); // "string"
    const posts = JSON.parse(postsJson);
    console.log(typeof posts); // "object" (array)

    const publishedPosts = posts.filter(post => post.published);
    console.log("Published posts:", publishedPosts);

    const sortedByLikes = [...posts].sort((a, b) => b.Likes - a.Likes);
    console.log("Posts sorted by likes:", sortedByLikes);

    const formattedPostsJson = sortedByLikes.map(p => `${p.title} - ${p.Likes} likes`);
    console.log("Formatted posts (JSON):", formattedPostsJson);

    const backToJson = JSON.stringify(publishedPosts);
    console.log("Back to JSON:", backToJson);

    // PART 5- Student Grade Tracker

    const gradeTracker = {
        students: [],

        addStudent(name, grades) {
            this.students.push({ name, grades });
        },
        getStudent(name) {
            const student = this.students.find(s => s.name === name);
            if (student) {
                return student;
            }
            return `Student ${name} not found.`;
        },

        getStudentAverage(name) {
            const student = this.students.find(s => s.name === name);
            if (!student || !student.grades) return null;

            const gradesArray = Object.values(student.grades);
            if (gradesArray.length === 0) return 0;

            const total = gradesArray.reduce((sum, item) => sum + Number(item), 0);
            return total / gradesArray.length;
        },

        getSubjectAverage(subject) {
            const subjectGrades = this.students
                .map(student => student.grades?. [subject])
                .filter(grade => grade !== undefined);
        

            if (subjectGrades.length === 0) {
                return `No grades found for ${subject}.`;
            }

            return subjectGrades.reduce((sum, grade) => sum + grade, 0) / subjectGrades.length;
        },

        getTopStudent() {
            if (this.students.length === 0) {
                return "No students available.";
            }

            let topStudent = this.students[0];
            let topAverage = this.getStudentAverage(topStudent.name);
            for (const student of this.students) {
                const studentAverage = this.getStudentAverage(student.name);
                if (studentAverage > topAverage) {
                    topStudent = student;
                }
            }
            return topStudent;
        },

        getStrugglingStudents() {
            return this.students.filter(student => {
                const average = this.getStudentAverage(student.name);
                return average !== null && average < 60;
            });
        },

        getLetterGrade(score) {
            if (score >= 90) return "A";
            if (score >= 80) return "B";
            if (score >= 70) return "C";
            if (score >= 60) return "D";
            return "F";
        },

        generateReportCard(name) {
            const student = this.getStudent(name);
            if (typeof student === "object") {
                const average = this.getStudentAverage(name);
                const letterGrade = this.getLetterGrade(average);
                return {
                    name: student.name,
                    average,
                    letterGrade
                };
            }
            return `Student ${name} not found.`;
        }
    }; 
          // Test Data   
            gradeTracker.addStudent("Esther", { math: 85, english: 90, science: 78 });
            gradeTracker.addStudent("Barbara", { math: 92, english: 88, science: 95 });
            gradeTracker.addStudent("Charlie", { math: 78, english: 82, science: 70 });
            gradeTracker.addStudent("Derrick", { math: 95, english: 92, science: 88 });
            gradeTracker.addStudent("Eva", { math: 55, english: 60, science: 50 });
        
          // Console Logs
            console.log(gradeTracker.getStudentAverage("Esther").toFixed(2));
            console.log(gradeTracker.getSubjectAverage("math").toFixed(2));
            console.log(gradeTracker.getTopStudent().name);
            console.log(gradeTracker.getStrugglingStudents().map(s => s.name));
            console.log(gradeTracker.getLetterGrade(95.67));
            console.log(gradeTracker.generateReportCard("Derrick"));

