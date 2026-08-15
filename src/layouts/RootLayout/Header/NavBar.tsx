import styled from "@emotion/styled"
import Link from "next/link"

const NavBar: React.FC = () => {
  const links = [{ id: 1, name: "About", to: "/about" }]
  return (
    <StyledWrapper className="">
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <Link href={link.to}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </StyledWrapper>
  )
}

export default NavBar

const StyledWrapper = styled.div`
  flex-shrink: 0;
  ul {
    display: flex;
    flex-direction: row;
    li {
      display: block;
      margin-left: 1rem;
      font-family: var(--font-label);
      font-size: 0.6875rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.gray11};

      :hover {
        color: ${({ theme }) => theme.colors.gray12};
      }
    }
  }
`
