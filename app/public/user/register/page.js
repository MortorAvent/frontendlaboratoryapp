export default function RegisterPage() {
    return (
      <div>
        <h1>Register</h1>
        <form>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
  