
const FetchError = ({ fetchError }) => (
    <div style={{ textAlign: 'center', padding: '40px', color: '#e74c3c' }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>⚠️</div>
        <h3>Lỗi tải dữ liệu</h3>
        <p>{fetchError}</p>
        <button 
            onClick={() => window.location.reload()} 
            style={{ 
                padding: '10px 20px', 
                backgroundColor: '#3498db', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                marginTop: '10px'
            }}
        >
            Thử lại
        </button>
    </div>
);

export default FetchError