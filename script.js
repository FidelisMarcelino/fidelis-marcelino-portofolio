// Initialize EmailJS
(function() {
    emailjs.init({
      publicKey: "cmE6dk-VJ3w6z3GQ5"
  });
})();

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name.length < 3) {
    alert("Name must be at least 3 characters long.");
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }
  if (message.length < 10) {
    alert("Message must be at least 10 characters long.");
    return false;
  }

  // Log sebelum kirim
  console.log("Sending payload", { name, email, message });

  emailjs.send("service_i4gpg7q", "template_nuape7q", {
    from_name: name,
    reply_to: email, 
    message: message,
  }).then(
    function(response) {
      alert("✅ Message sent successfully!");
      console.log("Success!", response);
      document.getElementById('contactForm').reset();
    },
    function(error) {
      console.error("❌ Failed", error);
      alert("❌ Failed to send message: " + JSON.stringify(error));
    }
  );
});

// Hamburger menu toggle
document.getElementById('hamburger').addEventListener('click', function() {
  const navList = document.querySelector('#navbar ul');
  navList.classList.toggle('active');
});