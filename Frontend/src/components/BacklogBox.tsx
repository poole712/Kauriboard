

function BacklogBox({ title }: { title: string }) {
    return (
        <div className="backlog-box">
            <h5 className="text-center m-3">{title}</h5>
        </div>
    )
}

export default BacklogBox;