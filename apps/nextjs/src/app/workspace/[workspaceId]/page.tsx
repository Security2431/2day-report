import FilldayModal from "./_components/modal/FilldayModal";

export default function WorkspacePage() {
  return (
    <>
      <FilldayModal
        projects={[
          {
            id: "652e78cfe5d72ca950a93b42",
            name: "reserv.me",
          },
          {
            id: "652e7861e286a8b1dc3615a9",
            name: "webjs unbillable",
          },
          {
            id: "652e7860e286a8b1dc3615a8",
            name: "piped.video",
          },
          {
            id: "652c21ae1b4490c7565ab9b4",
            name: "2day.report",
          },
          {
            id: "652ea590633990ea019ee7a6",
            name: "kittie.tech",
          },
        ]}
      />
    </>
  );
}
