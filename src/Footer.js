const Footer = () => {
    const date = new Date();
    return(
        <footer className='footer'>
            <h2>@Hicaduda {date.getFullYear()}</h2>
        </footer>
    )
}

export default Footer;