const LoadingSkeleton = ({ style }) => (
	<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px' }}>
		<div style={{ textAlign: 'center', color: '#666' }}>
			<div style={{
				width: '40px',
				height: '40px',
				border: '3px solid #f3f3f3',
				borderTop: '3px solid #3498db',
				borderRadius: '50%',
				animation: 'spin 1s linear infinite',
				margin: '0 auto 10px'
			}}></div>
			<p>Đang tải dữ liệu nhóm...</p>
		</div>
		{[...Array(8)].map((_, index) => (
			<div key={index} className={`${style.GroupBlock} ${style.BlockRow} skeleton-item`} 
				style={{
					backgroundColor: '#f8f9fa',
					border: '1px solid #e9ecef',
					borderRadius: '8px',
					marginBottom: '8px'
				}}>
				<div className={style.grlistName}>
					<div style={{
						backgroundColor: '#e9ecef',
						height: '18px',
						borderRadius: '4px',
						width: `${Math.random() * 40 + 60}%`
					}}></div>
				</div>
				<div className={style.grState}>
					<div style={{
						backgroundColor: '#e9ecef',
						height: '20px',
						width: '20px',
						borderRadius: '50%'
					}}></div>
				</div>
				<div className={style.grMember}>
					<div style={{
						backgroundColor: '#e9ecef',
						height: '16px',
						width: '40px',
						borderRadius: '4px'
					}}></div>
				</div>
				<div className={style.grCategory}></div>
				<div className={style.grStateQueue}></div>
				<div className={style.joinStateBlock}></div>
			</div>
		))}
	</div>
);

export default LoadingSkeleton;
