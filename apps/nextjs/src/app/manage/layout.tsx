export default function ManageLayout(props: {
  children: React.ReactNode;
  teams: React.ReactNode;
  apps: React.ReactNode;
}) {
  <div>
    <h1>hello manage layout</h1>
    {props.children}
    {props.teams}
    {props.apps}
  </div>;
}
