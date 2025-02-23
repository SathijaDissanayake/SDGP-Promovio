import StatusBadge from './StatusBadge';

const data = [
    {
        contact: 'Earl Grayson',
        email: 'earl.grayson@example.com',
        leadStatus: 'New Lead',
        lastContact: '29 Jul 2023'
    },
    {
        contact: 'Jake Vargas',
        email: 'jake.vargas@example.com',
        leadStatus: 'Contacted',
        lastContact: '1 Jul 2023'
    },
    {
        contact: 'Chloe Raines',
        email: 'chloe.raines@example.com',
        leadStatus: 'Interested',
        lastContact: '6 Jun 2023'
    },
    {
        contact: 'Josh Reynaldo',
        email: 'josh.reynaldo@example.com',
        leadStatus: 'Negotiation',
        lastContact: '5 May 2023'
    },
    {
        contact: 'Jacob Swanson',
        email: 'jacob.swanson@example.com',
        leadStatus: 'Converted',
        lastContact: '1 May 2023'
    },
    {
        contact: 'Chloe Raines',
        email: 'chloe.raines@example.com',
        leadStatus: 'Lost',
        lastContact: '20 Apr 2023'
    }
];

export default function Table() {
    return (
        <table className="lead-table">
            <thead>
            <tr>

                <th>Contact</th>
                <th>Email</th>
                <th>Lead Status</th>
                <th>Last Contact</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>

                    <td>{item.contact}</td>
                    <td>{item.email}</td>
                    <td>
                        <StatusBadge status={item.leadStatus} />
                    </td>
                    <td>{item.lastContact}</td>
                    <td>
                        <button className="action-btn">View</button>
                        <button className="action-btn">Edit</button>
                        <button className="action-btn">Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
