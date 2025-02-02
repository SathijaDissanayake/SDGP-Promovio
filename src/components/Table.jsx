import StatusBadge from './StatusBadge';

const data = [
    {
        task: 'Product Requirements',
        type: 'PDF',
        author: 'Earl Grayson',
        version: 1,
        status: 'Active',
        uploaded: '29 Jul 2023'
    },
    {
        task: 'New Product Launch Plan',
        type: 'PDF',
        author: 'Jake Vargas',
        version: 2,
        status: 'Active',
        uploaded: '1 Jul 2023'
    },
    {
        task: 'Sales Meeting Agenda',
        type: 'DOC',
        author: 'Chloe Raines',
        version: 0,
        status: 'Active',
        uploaded: '6 Jun 2023'
    },
    {
        task: 'Feedback Analysis',
        type: 'DOC',
        author: 'Josh Reynaldo',
        version: 3,
        status: 'Active',
        uploaded: '5 May 2023'
    },
    {
        task: 'Inventory Management',
        type: 'XLSX',
        author: 'Jacob Swanson',
        version: 1,
        status: 'Archive',
        uploaded: '1 May 2023'
    },
    {
        task: 'Sales Forecasting',
        type: 'XLSX',
        author: 'Chloe Raines',
        version: 1,
        status: 'Archive',
        uploaded: '20 Apr 2023'
    },
    {
        task: 'Vendor Negotiation',
        type: 'DOC',
        author: 'Chloe Raines',
        version: 2,
        status: 'Active',
        uploaded: '7 Apr 2023'
    },
    {
        task: 'Merchandising Guidelines',
        type: 'DOC',
        author: 'Jake Vargas',
        version: 4,
        status: 'Archive',
        uploaded: '24 Mar 2023'
    },
];

export default function Table() {
    return (
        <table className="task-table">
            <thead>
            <tr>
                <th>
                    <input type="checkbox" />
                </th>
                <th>Task</th>
                <th>Type</th>
                <th>Author</th>
                <th>Version</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    {/* Checkbox */}
                    <td>
                        <input type="checkbox" />
                    </td>
                    {/* Task Name and Uploaded Date */}
                    <td>
                        <div className="task-name">{item.task}</div>
                        <div className="uploaded-date">Uploaded {item.uploaded}</div>
                    </td>
                    {/* Other Columns */}
                    <td>{item.type}</td>
                    <td>{item.author}</td>
                    <td>{item.version}</td>
                    <td>
                        <StatusBadge status={item.status} />
                    </td>
                    {/* Actions */}
                    <td>
                        <button className="action-btn">View</button>
                        <button className="action-btn">Edit</button>
                        <button className="action-btn">Create</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
