export default function StatusBadge({ status }) {
    return (
        <span className={`status-badge ${status.toLowerCase()}`}>
      {status}
    </span>
    );
}


