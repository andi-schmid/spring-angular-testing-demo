package org.addressbook.infrastructure;

import org.addressbook.domain.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonRepository extends JpaRepository<Person, Integer> {

    List<Person> findByFirstname(String firstname);

    List<Person> findByLastname(String Lastname);

    List<Person> findByFirstnameAndLastname(String firstname, String Lastname);
}
