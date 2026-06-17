function StatusTable({ data }) {

    return (
      <table className="status-table">
  
        <thead>
          <tr>
            <th>🌐 URL</th>
            <th>📊 Status</th>
            <th>🔢 Status Code</th>
            <th>⚡ Response Time</th>
            <th>🕒 Last Checked</th>
          </tr>
        </thead>
  
        <tbody>
  
          {data.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="empty-state"
              >
                No URLs monitored yet.
              </td>
            </tr>
          ) : (
  
            data.map((item, index) => (
  
              <tr key={index}>
  
                <td>
                  {item.url}
                </td>
  
                <td>
  
                  {item.status === "UP" ? (
  
                    <span className="badge-up">
                      🟢 UP
                    </span>
  
                  ) : (
  
                    <span className="badge-down">
                      🔴 DOWN
                    </span>
  
                  )}
  
                </td>
  
                <td>
                  {item.status_code || "--"}
                </td>
  
                <td>
  
                  {item.response_time
                    ? `${Math.round(item.response_time)} ms`
                    : "--"}
  
                </td>
  
                <td>
  
                  {item.checked_at
                    ? new Date(
                        item.checked_at
                      ).toLocaleString()
                    : "--"}
  
                </td>
  
              </tr>
  
            ))
  
          )}
  
        </tbody>
  
      </table>
    );
  }
  
  export default StatusTable;