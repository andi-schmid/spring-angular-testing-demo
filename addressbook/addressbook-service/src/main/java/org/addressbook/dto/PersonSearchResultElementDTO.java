package org.addressbook.dto;

public class PersonSearchResultElementDTO {

    private Integer id;
    private String firstname;
    private String lastname;
    private String zip;
    private String city;

    public PersonSearchResultElementDTO() {
    }

    public PersonSearchResultElementDTO(Integer id, String firstname, String lastname, String zip, String city) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.zip = zip;
        this.city = city;
    }

    public int getId() {
        return id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Override
    public String toString() {
        return "PersonSearchResultElementDTO{id=" + id + ", firstname='" + firstname + '\'' + ", lastname='" + lastname + '\'' +
                ", zip='" + zip + '\'' + ", city='" + city + '\'' + '}';
    }
}
