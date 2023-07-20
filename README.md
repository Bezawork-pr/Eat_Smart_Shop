# <pre> EAT SMART SHOP </pre>

I am Bezawork Belachew Lindlof, 😀 a graduate of ALX Software Engineering School.

I created this online shop for my final project at ALX Software Engineering School. I have used NodeJS, SQL Express, and EJS.

# <pre> Features </pre>

A user can register.

A user can log in.

A user can place orders.

# <pre> Demo </pre>
## <pre> Index page and login </pre>
https://github.com/Bezawork-pr/Eat_Smart_Shop/assets/107026397/5532eb4e-cad3-449c-9e5a-0e4ff4b12ad0
## <pre> Code </pre>
https://github.com/Bezawork-pr/Eat_Smart_Shop/assets/107026397/c47cc4af-37e2-4a20-ae2a-1567d61e3d53
## <pre> Order </pre>
https://github.com/Bezawork-pr/Eat_Smart_Shop/assets/107026397/2efdd386-70a6-4b51-bed6-29e6953b9211


# <pre> CODE </pre>
<pre>
  app.post("/login", (req, res) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  let currentUserFirstName = firstName;
  let currentUserLastName = lastName;
  let result = 1;
  connection.query("SELECT * FROM Product", (err, res) => {
    result = res;
  });
  connection.query("DELETE FROM CurrentUser");
  connection.query(
    "INSERT INTO CurrentUser (FirstName, LastName) VALUES (?, ?)",
    [firstName, lastName],
    (err, result) => {
      if (err) throw err;
      console.log("Current User added to DB");
    }
  );
  connection.query("SELECT * FROM User", (err, Userresult) => {
    for (let i in Userresult) {
      if (
        Userresult[i].FirstName === firstName &&
        Userresult[i].LastName === lastName
      ) {
        res.render("pages/logged", {
          result: result,
          firstName: firstName,
          lastName: lastName,
        });
      }
    }
  });
});
</pre>




