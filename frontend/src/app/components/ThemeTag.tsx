const ThemeTag = ({color, tag}) => {

    return (
        <div className="inline-block mx-1 rounded-md p-1 m-2" style={{ backgroundColor: color }}>{tag}</div>
    )
}

export default ThemeTag;